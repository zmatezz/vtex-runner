import { serverHttp } from "./app";

serverHttp.listen(process.env.PORT || 4000, () => console.log('server is running 🚀'));
