import { redirect } from "react-router-dom";
import { ITokenInfo, RefreshToken } from "../api/interface";
import { AxiosPromise } from "axios";
import { updateAccessToken } from "../api/api";
import { tokenUtil } from "../components/TokenUtil/tokenUtil";

// export function getTokens() {
//     const tokens = {
//         // accessToken: localStorage.getItem('accessToken'),
//         accessToken: tokenUtil.getAccessToken(),
//         refreshToken: localStorage.getItem('refreshToken')
//     }
//     return tokens;
// }

export function checkAuthLoader() {
    if (!localStorage.getItem('refreshToken')) {
        return redirect('/auth')
    }
}

export function removeTokens() {
    // localStorage.removeItem('accessToken');
    tokenUtil.removeAccessToken();
    localStorage.removeItem('refreshToken')
    // localStorage.removeItem('expirationAccessToken')
    // localStorage.removeItem('expirationRefreshToken')
}

// export function removeAccessToken() {
//     tokenUtil.removeAccessToken();
// }

// export function getAccessTokenDuration() {
//     const storedAccessTokenExpiration = localStorage.getItem('expirationAccessToken');
//     if (typeof storedAccessTokenExpiration === 'string') {
//         const expirationAccessTokenDate = new Date(storedAccessTokenExpiration);
//         const now = new Date();
//         const duration = expirationAccessTokenDate.getTime() - now.getTime();
//         return duration;
//     }
// }

// export function getRefreshTokenDuration() {
//     const storedRefreshTokenExpiration = localStorage.getItem('expirationRefreshToken');
//     if (typeof storedRefreshTokenExpiration === 'string') {
//         const expirationRefreshTokenDate = new Date(storedRefreshTokenExpiration);
//         const now = new Date();
//         const duration = expirationRefreshTokenDate.getTime() - now.getTime();
//         return duration;
//     }
// }

// export function checkAccessTokenDuration() {
//     const accessTokenDuration = getAccessTokenDuration();

//     if (typeof accessTokenDuration === 'number' && accessTokenDuration < 0) {
//         return 'EXPIRED';
//     } else {
//         return accessTokenDuration;
//     }
// }

// export function checkRefreshTokenDuration() {
//     const refreshTokenDuration = getRefreshTokenDuration();

//     if (typeof refreshTokenDuration === 'number' && refreshTokenDuration < 0) {
//         return 'EXPIRED';
//     } else {
//         return refreshTokenDuration;
//     }
// }

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) {
        return true
    }
    try {
        const tokenInfo = token.split('.')[1]
        const tokenInfoDecoded = window.atob(tokenInfo);
        const tokenInfoObj: ITokenInfo = JSON.parse(tokenInfoDecoded);
        const tokenLeftTime = tokenInfoObj.exp - Math.round(+ new Date() / 1000);

        if (tokenLeftTime < 0) {
            return true;
        }

        return false;

    } catch (error: any) {
        console.log(error);
        return true;
    }
}

let refreshTokenRequest: AxiosPromise<RefreshToken> | null = null;

export async function refreshAccessToken() {
    try {
        if (refreshTokenRequest === null) {
            refreshTokenRequest = updateAccessToken();
        }
        const res = await refreshTokenRequest;
        refreshTokenRequest = null;
        return res.data;
    } catch (error: any) {
        if (error.response.status >= 500) {
            alert("Ошибка со стороны сервера, попробуйте позже.");
        }
    }
}

export async function checkIsAuth() {
    if (localStorage.getItem('refreshToken')) {
        try {
            if (refreshTokenRequest === null) {
                refreshTokenRequest = updateAccessToken();
            }
            const res = await refreshTokenRequest;
            refreshTokenRequest = null;
            return res.data;
        } catch (error: any) {
            if (error.response.status === 401) {
                redirect('/auth');
            }
        }
    } else {
        redirect('/auth');
    }
}