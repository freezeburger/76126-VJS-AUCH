import * as UI from '@/components';

export const auchanLibrary = {
    install( app :any, options?:any) {
        
        console.log('UI Plugin installed with options:', options, app);

        Object.values(UI).forEach((component) => {
            app.component((component as any).__name.split('.')[0], component);
        });
    }
}