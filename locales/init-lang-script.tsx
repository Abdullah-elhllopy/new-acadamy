import { I18LANG } from "@/shared/constants/constant";

export function InitLangScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const savedLang = localStorage.getItem(${I18LANG}) || 'ar';
              const dir = savedLang === 'ar' ? 'rtl' : 'ltr';
              document.documentElement.dir = dir;
              document.documentElement.lang = savedLang;
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}
