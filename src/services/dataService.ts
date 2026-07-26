interface ThemeData {
  theme: string;
  words?: unknown[];
  adjectives?: unknown[];
  adverbs?: unknown[];
  sentences?: unknown[];
  [key: string]: unknown;
}

export interface Theme extends ThemeData {
  id: number;
  route: string;
  fileName: string;
}

// Theme files are eagerly imported, so these lookups are synchronous.
export const loadAllThemes = (): Theme[] => {
  const themes: Theme[] = [];
  
  // Get all JSON files from data folder using Vite's import.meta.glob
  const modules = import.meta.glob<{ default: ThemeData }>('../data/*.json', { eager: true });
  
  Object.keys(modules).forEach((key) => {
    const themeData = modules[key].default;
    const fileName = key.replace('../data/', '').replace('.json', '');
    const route = `/${fileName}`;
    
    themes.push({
      ...themeData,
      id: themes.length + 1,
      route: route,
      fileName: fileName
    });
  });
  
  return themes;
};

export const loadThemeByRoute = (route: string): Theme | null => {
  const themes = loadAllThemes();
  return themes.find(theme => theme.route === route) || null;
};

export const hasThemeRoute = (route: string): boolean =>
  loadAllThemes().some((theme) => theme.route === route);

export const loadThemeByFileName = async (fileName: string): Promise<Omit<Theme, 'id'> | null> => {
  try {
    const module = await import(`../data/${fileName}.json`);
    return {
      ...module.default,
      route: `/${fileName}`,
      fileName: fileName
    };
  } catch (error) {
    console.error(`Theme ${fileName} not found:`, error);
    return null;
  }
};
