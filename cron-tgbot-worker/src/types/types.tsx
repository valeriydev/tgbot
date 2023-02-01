export type telegramAnswer = {
    ok: boolean
    result: {
        url: string,
        has_custom_certificate: boolean,
        pending_update_count: number,
        max_connections: number,
        ip_address: string,
    }
}