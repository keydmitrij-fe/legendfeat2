class TokenUtil {
    #accessToken: string | null = null;

    set AccessToken(token: string) {
        this.#accessToken = token;
    };

    get AccessToken(): string | null {
        return this.#accessToken;
    }
    removeAccessToken() {
        this.#accessToken = null;
    }
}

export const tokenUtil = new TokenUtil();