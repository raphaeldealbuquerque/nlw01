
import knex from '../database/connection';
import {Request, Response} from 'express';
import internalip from 'internal-ip';

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*');
        const address = "http://" + (await internalip.v4());
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${address}:3333/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;