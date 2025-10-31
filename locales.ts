import { ProductStatus } from './types';

export type Language = 'ja';

export const locales = {
  pageTitle: {
    ja: 'コラボグッズ販売状況',
  },
  headerTitle: {
    ja: 'コラボグッズ販売状況',
  },
  lastUpdated: {
    ja: '更新日',
  },
  storeName: {
    ja: '店名',
  },
  goBack: {
    ja: '戻る',
  },
  themeToggle: {
      light: { ja: 'ライトモードに切り替え' },
      dark: { ja: 'ダークモードに切り替え' },
  },
  selectProducts: {
    ja: '表示する商品を選択',
  },
  selectAll: {
    ja: 'すべて選択',
  },
  clearSelection: {
    ja: '選択をクリア',
  },
  refreshData: {
    ja: 'データを更新',
  },
  dataSourceUrl: {
    ja: 'データソースURL',
  },
  downloadProject: {
    ja: 'プロジェクトをダウンロード',
  },
  // FIX: Add missing locale keys for the settings modal to resolve errors in components/SettingsModal.tsx.
  settings: {
    ja: '設定',
  },
  settingsDescription: {
    ja: 'データソースのURLを編集します。',
  },
  cancel: {
    ja: 'キャンセル',
  },
  save: {
    ja: '保存',
  },
};

export const statusTranslations: Record<ProductStatus, Record<Language, string>> = {
  [ProductStatus.InStock]: {
    ja: '販売中',
  },
  [ProductStatus.SoldOut]: {
    ja: 'SOLD OUT',
  },
  [ProductStatus.BeforeSale]: {
    ja: '販売前',
  },
};
