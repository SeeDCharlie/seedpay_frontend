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
					path: '/ventas/venta', title: 'Registrar Venta', type: 'link', badgeType: 'primary', active: false
				},
				{
					path: '/ventas/informeVentas', title: 'Informe de Ventas', icon: 'clipboard', type: 'link', badgeType: 'primary', active: false
				}
			]
		},
		{
			path: '/negocios', title: 'Negocios', icon: 'archive', type: 'sub', badgeType: 'primary', active: false, children: [
        { path: '/negocios/lista', title: 'Mis negocios', type: 'link' },
        { path: '/negocios/negocio', title: 'Nuevo', type: 'link',icon: 'archive', badgeType: 'primary' },
      ]
		},
    {
			path: '/productos', title: 'Productos', icon: 'box', type: 'sub', badgeType: 'primary', active: false, children: [
        { path: '/productos/lista', title: 'Mis productos', type: 'link' },
        { path: '/productos/producto', title: 'Nuevo', type: 'link',icon: 'archive', badgeType: 'primary' },
      ]
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
