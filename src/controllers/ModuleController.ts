import axios from 'axios';
import { Request, Response } from 'express';

class ModuleController {
    searchParams(req: Request, res: Response) {
        const params = new URLSearchParams();
        for (const key in req.query) {
            params.append(key, req.query[key].toString());
        }
        return {
            params
        }
    }

    mapList(itemsList: any[], url: string, ms, fn: Function) {
        itemsList.map(async (productId) => {
            // console.log('item->', productId);
            if (productId.length > 0) {
                try {
                    const { data } = await axios.get(
                        `${url}`, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-VTEX-API-AppKey': process.env.VTEX_API_APPKEY,
                            'X-VTEX-API-AppToken': process.env.VTEX_API_APPTOKEN
                        }
                    });
                    if (data) {
                        fn();
                    }
                } catch (error) {
                    console.log(`Erro ao executar serviço`, error);
                }
            } else {
                console.log('item nao encontrado ->', productId);
            }
            await new Promise(resolve => setTimeout(resolve, ms));
        });
    }
}

export const moduleController = () => {
    const searchParams = new ModuleController().searchParams;
    const mapList = new ModuleController().mapList;
    return {
        searchParams,
        mapList
    }
}

