import {telegramAnswer} from "./types/types";

export interface Env {
    BOT_TOKEN: string,
    BOT_WEBHOOK: string,
    kv_env: KVNamespace,
}

export default {
    async scheduled(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ) {
        await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/setWebhook?url=${env.BOT_WEBHOOK}`);
        const response: telegramAnswer = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/getWebhookInfo`).then((data) => {
             return data.json();
        });
        await setKVValue(env, "tgbot-worker.BOT_WEBHOOK", response.result.url);
    },
};

export async function setKVValue(env: any, kvKey:string, kvValue: string) {
    await env.kv_env.put(kvKey, kvValue);
}
