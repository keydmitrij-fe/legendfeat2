class TokenUtil {
    #accessToken: string | null = null;

    setAccessToken(token: string) {
        this.#accessToken = token;
    };

    getAccessToken(): string | null {
        return this.#accessToken;
    }
    removeAccessToken() {
        this.#accessToken = null;
    }
}

export const tokenUtil = new TokenUtil();