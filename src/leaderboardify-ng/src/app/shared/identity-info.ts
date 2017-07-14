import { Injectable } from '@angular/core';

@Injectable()
export class IdentityInfo {
    isAuthenticated: boolean;
    authenticatedUserName: string;
    userId: string;
}