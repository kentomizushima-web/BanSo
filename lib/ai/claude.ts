export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}

function getContextualResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes('財務') || msg.includes('pl') || msg.includes('決算')) {
    return `財務三表を分析した結果をお伝えします。

**売上・収益性**
- 直近3月の売上: ¥45.2M（前月比+12.3%、目標比+7.6%）
- 粗利率: 28.3%（業界平均26.1%を上回る）
- 営業利益率: 8.8%（良好な水準）

**課題点**
- 消耗品費が12月に異常増加（平均の2.3倍）
- 1〜2月の売上が前年同月比でわずかに減少

**推奨アクション**
1. 消耗品費の内訳を確認し、一括発注体制に切り替える
2. 1〜2月の受注減少原因（大口顧客Aの発注減）を分析する
3. 4月以降の受注パイプラインを早期に確定させる

詳細な分析が必要な項目はありますか？`
  }

  if (msg.includes('資金') || msg.includes('キャッシュ') || msg.includes('cf')) {
    return `資金繰り状況を分析しました。

**現状**
- 資金残高: ¥28.4M（目標¥30Mを若干下回る）
- ALIVE期間: 8.2ヶ月（安全水準6ヶ月を十分上回る）
- 直近の営業CF: ¥3.2M（前月比-15%、要注意）

**リスク要因**
- 資金残高が3ヶ月連続で微減傾向
- 大口顧客からの入金遅延の可能性

**対策オプション**
1. **即効性あり**: 売掛金の回収サイト短縮交渉（60日→45日）
2. **中期対策**: 銀行当座貸越枠の確認・活用準備
3. **予防的措置**: 請求書ファクタリングの検討

田中税理士に詳細な資金繰り改善プランの作成をご依頼しますか？`
  }

  if (msg.includes('ベンチマーク') || msg.includes('業界') || msg.includes('比較')) {
    return `業界ベンチマーク比較の結果をお伝えします。

**強み（上位40%以内）**
- 売上成長率: 9.8%（業界平均4.5%）72パーセンタイル
- 稼働率: 87.3%（業界平均82.5%）68パーセンタイル
- 粗利率: 28.3%（業界平均26.1%）62パーセンタイル

**改善余地（下位40%以内）**
- 借入依存度: 36.8%（業界平均28.0%）35パーセンタイル
- 売掛金回転期間: 25.8日（業界平均22.0日）42パーセンタイル

**総合評価**: 業界偏差値62（上位38%）

借入依存度と売掛金回転期間の改善を優先することで、財務健全性がさらに向上します。`
  }

  if (msg.includes('予算') || msg.includes('来期') || msg.includes('計画')) {
    return `来期（FY2026）の予算案を作成しました。

**収益計画（基本シナリオ）**
- 売上高目標: ¥520M（今期比+9.7%）
- 粗利率目標: 29.5%（今期比+1.2pt）
- 営業利益目標: ¥48M（今期比+18.5%）

**主要施策と投資**
1. 配送管理システム更新: ¥8M → 稼働率+3%
2. ドライバー採用: ¥3.5M → 受注容量+20%
3. 神奈川西部開拓: ¥5M → 新規売上+¥72M/年

**キャッシュフロー見込み**
- 設備投資: ¥16.5M
- 営業CFからの自己資金: ¥38M
- 外部調達不要（自己資金で賄える水準）

この予算案を叩き台として田中税理士にレビューを依頼しますか？`
  }

  return `ご質問「${userMessage}」について分析しました。

現在のサンプル物流株式会社のデータを基に回答しています。

**概況**
3月決算では売上¥45.2M（目標比+7.6%）と好調でした。一方、資金繰りには若干の注意が必要で、消耗品費の異常増加（前月比+130%）も確認されています。

**次のアクション候補**
1. 消耗品費の内訳確認と一括発注体制の構築（削減効果¥48万/年）
2. 大口顧客へのアップセル提案（売上貢献¥240万/月見込み）
3. 幹線ルート再編による燃料費15%削減（¥180万/年）

他にご質問があればお気軽にどうぞ。財務分析・資金繰り・業界比較など何でもお答えします。`
}

export async function streamAIResponse(
  userMessage: string,
  onChunk: (chunk: string) => void,
  onComplete: (fullText: string) => void
): Promise<void> {
  const fullResponse = getContextualResponse(userMessage)
  let accumulated = ''
  for (const char of fullResponse) {
    accumulated += char
    onChunk(char)
    const delay = char === '\n' ? 30 : char === '。' || char === '、' ? 20 : 8
    await new Promise(resolve => setTimeout(resolve, delay))
  }
  onComplete(accumulated)
}

export async function generateAIResponse(userMessage: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 800))
  return getContextualResponse(userMessage)
}
