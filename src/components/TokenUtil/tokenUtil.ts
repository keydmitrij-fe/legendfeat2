class TokenUtil {
    #accessToken: string = '';

    setAccessToken(token: string) {
        this.#accessToken = token;
    };

    getAccessToken() {
        return this.#accessToken;
    }
    removeAccessToken() {
        this.#accessToken = '';
    }
}

export const tokenUtil = new TokenUtil();