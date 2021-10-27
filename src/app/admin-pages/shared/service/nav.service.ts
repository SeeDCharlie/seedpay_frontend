import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Ventas', icon: 'dollar-sign', type: 'sub', active: false, children: [
				{ path: '/ventas/pedidos', title: 'Pedidos', type: 'link' },
				{
					path: '/registrarVenta', title: 'Registrar Venta', type: 'link', badgeType: 'primary', active: false
				},
				{
					path: '/informeVenta', title: 'Informe de Ventas', icon: 'clipboard', type: 'link', badgeType: 'primary', active: false
				}
			]
		},
		{
			path: '/negocio', title: 'Negocios', icon: 'archive', type: 'link', badgeType: 'primary', active: false
		},
		{
			path: '/cuenta', title: 'Cuenta', icon: 'settings', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Login',path: '/auth/login', icon: 'log-in', type: 'link', active: false
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
