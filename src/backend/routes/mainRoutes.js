import { format } from 'node:path';
import { supabase } from '../database/db.js';

export const routes = [
    {
        method: 'GET',
        url: '/getInfos',
        handler: async (req, res)=>{
            const { data, error } = await supabase
                .from('projects')
                .select('*');
            
            const formatted = data.map(e => {
                return {
                    number: e.id,
                    type: e.role,
                    name: e.name,
                    more: e.summary,
                    stackTags: e.stacks,
                    imagesProject: e.images,
                    link: e.git_url,
                }
            });

            console.log(formatted);

            if(error){
                return res.end(JSON.stringify({ error: error }));
            }

            return res.end(JSON.stringify({ data: formatted }));
        }
    },
];

export default routes;