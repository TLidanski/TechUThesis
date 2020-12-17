import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): any {
		try {
			if (JSON.parse(sessionStorage.getItem('currentUser'))) {
				return true;
			} else {
				this.router.navigate(['login']);
				return false;
			}

		} catch (error) {

			this.router.navigate(['login']);
			return false;
		}
	}

}