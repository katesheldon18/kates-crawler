import { NextApiRequest, NextApiResponse } from "next";
import { printReport } from "../../report.js";
import { main } from "../../main.js";

export default function Endpoint(req: NextApiRequest, res: NextApiResponse) {
    main(req.query.url);
    return res.send([])
}