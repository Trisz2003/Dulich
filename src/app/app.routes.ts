import { Routes } from '@angular/router';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { DulichnuocngoaiComponent } from './dulichnuocngoai/dulichnuocngoai.component';
import { DulichtrongnuocComponent } from './dulichtrongnuoc/dulichtrongnuoc.component';
import { TintucComponent } from './tintuc/tintuc.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { ChitietsanphamComponent } from './chitietsanpham/chitietsanpham.component';
import { GiohangComponent } from './giohang/giohang.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { DangkyComponent } from './dangky/dangky.component';
import { TimkiemComponent } from './timkiem/timkiem.component';
import { ThongtinnguoidungComponent } from './thongtinnguoidung/thongtinnguoidung.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangPasswordComponent } from './chang-password/chang-password.component';



export const routes: Routes = [
    { path: '', redirectTo: 'trangchu', pathMatch: 'full' },
    { path: 'trangchu', component: TrangchuComponent },
    { path: 'dulichnuocngoai', component: DulichnuocngoaiComponent },
    { path: 'dulichtrongnuoc', component:DulichtrongnuocComponent},
    { path: 'tintuc', component: TintucComponent },
    { path: 'lienhe', component: LienheComponent },
    { path: 'chitietsanpham/:id', component: ChitietsanphamComponent },
    {path:'giohang',component:GiohangComponent},
    {path:'dangnhap',component:DangnhapComponent},
    {path:'dangky',component:DangkyComponent},
    {path:'timkiem',component:TimkiemComponent},
    {path:'thongtin',component:ThongtinnguoidungComponent},
    {path:'quenmatkhau',component:ForgotPasswordComponent},
    {path:'doimatkhau',component:ChangPasswordComponent}
];
