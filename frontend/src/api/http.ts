export async function http<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`/api${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })

    if (!res.ok) {
        throw new Error(`Lỗi HTTP ${res.status}`)
    }

    return res.json()
}