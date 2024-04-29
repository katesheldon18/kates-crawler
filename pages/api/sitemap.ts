import { NextApiRequest, NextApiResponse } from "next";
import { main } from "../../main.js";

export default async function Endpoint(req: NextApiRequest, res: NextApiResponse) {
    const sitemap = await main(req.query.url);
    return res.send(sitemap);
}
