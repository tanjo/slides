class: center, middle

# GitHub Actions のあれこれ

---
class: center, middle

## PRのレビュアーアサイン時に自動で
## メンションコメントを飛ばすGitHub Actionsの実装

---
class: center, middle

#### PRでレビュアーがアサインされた際に、
## 「＠xxx さんレビュアーお願いします」と自動でコメントし、
#### レビューの見落としを防ぐ。

---
class: center, middle

### 仕様・調査内容

---
class: center, middle

GitHub Actionsの pull_request イベント（types: [review_requested]）をトリガーにする。

参考: [ワークフローをトリガーするイベント - GitHub Docs](https://docs.github.com/ja/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request)

---
class: center, middle

ペイロードには個人（requested_reviewer）とチーム（requested_team）の2パターンがあるため、

それぞれメンション形式を分ける必要がある。

---
class: center, middle

### 懸念事項と対策方針

---
class: center, middle

単純にイベント発火で即時処理すると、

「誤操作でアサインしてすぐ外した時」や

「複数人をポンポンと連続でアサインした時」に、

アクションが複数回走ってしまいコメントが連投される問題がある。

---
class: center, middle

そのため、次の対策を入れた設計とする：

---
class: center, middle

### 連続実行のキャンセル

`concurrency` を設定し、連続でイベントが飛んできたら古いジョブを破棄する。

---
class: center, middle

### バッファ時間の設定

アクション内で `sleep 30` 程度待機し、ユーザーの連続操作が終わるのを待つ。

---
class: center, middle

### 最新状態の取得

イベントのペイロードではなく、待機後の最新のPR情報をAPIで取得し直し、残っているレビュアー全員にまとめてメンションする。

---
class: center, middle

## コード

---
class: middle

```yaml
name: Auto Comment on Review Request

on:
  pull_request:
    types: [review_requested]

# 連続発火時は古いジョブをキャンセルしてまとめる
concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number }}
  cancel-in-progress: true

jobs:
  add-comment:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - name: Wait for stabilization
        run: sleep 30
```

---
class: middle

```yaml
      - name: Post grouped comment to the reviewers
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            // 待機後の最新のPR状態を取得
            const { data: pr } = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number
            });

            const reviewers = pr.requested_reviewers.map(user => `@${user.login}`);
            const teams = pr.requested_teams.map(team => `@${context.repo.owner}/${team.slug}`);
            const allMentions = [...reviewers, ...teams];
```

---
class: middle

```yaml

            // 誤操作で全員外されていた場合は何もしない
            if (allMentions.length === 0) return;

            const commentBody = `${allMentions.join(" ")} さん、レビューをお願いします！`;
            
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: commentBody
            });
```