
import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordChangeEmailComponent } from './components/pages/forgotpass/password-change-email/password-change-email.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { LoginComponent } from './components/pages/login/login.component';
import { OnboardingComponent } from './components/pages/onboarding/onboarding.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PasswordChangeComponent } from './components/pages/forgotpass/password-change/password-change.component';
import { LoginService } from './services/ResidentialUser/login.service';
import { ResidentialGuard } from './guards/residential.guard';
import { CommunityProfileComponent } from './components/pages/community/community-profile/community-profile.component';
import { CommunityContactsComponent } from './components/pages/community/community-contacts/community-contacts.component';
import { SupportComponent } from './components/pages/support/support.component';
import { ResidentialUserProfileComponent } from './components/pages/residentialProfile/residential-user-profile/residential-user-profile.component';
import { ResidentialUserEditProfileComponent } from './components/pages/residentialProfile/residential-user-edit-profile/residential-user-edit-profile.component';
import { OnboardingGuard } from './guards/onboarding.guard';
import { LoggedInUserGuard } from './guards/logged-in-user.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { ChangeCommunityComponent } from './components/pages/change-community/change-community.component';
import { SurveyComponent } from './components/pages/survey/survey.component';
import { InterestsComponent } from './components/pages/interests/interests.component';
import { PrivacySettingsComponent } from './components/pages/privacy-settings/privacy-settings.component';


import { RegisterVendorComponent } from './vendor/components/pages/register-vendor/register-vendor.component';
import { LoginVendorComponent } from './vendor/components/pages/login-vendor/login-vendor.component';
import { AddProductComponent } from './vendor/components/pages/add-product/add-product.component';
import { ViewProfileComponent } from './components/pages/view-profile/view-profile.component';
import { AdminLoginComponent } from './admin/pages/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';
import { ViewCommunityComponent } from './admin/pages/view-community/view-community.component';
import { ViewUserComponent } from './admin/pages/view-user/view-user.component';
import { HomeVendorComponent } from './vendor/components/pages/home-vendor/home-vendor.component';
import { VendorProductPageComponent } from './vendor/components/pages/vendor-product-page/vendor-product-page.component';
import { ViewProfileVendorComponent } from './vendor/components/pages/profile/view-profile-vendor/view-profile-vendor.component';
import { EditProfileVendorComponent } from './vendor/components/pages/profile/edit-profile-vendor/edit-profile-vendor.component';
import { EditProductComponent } from './vendor/components/pages/edit-product/edit-product.component';
import { MarketProductComponent } from './components/pages/market/market-product/market-product.component';
import { MarketHomeComponent } from './components/pages/market/market-home/market-home.component';
import { UserCartComponent } from './components/pages/market/user-cart/user-cart.component';
import { CheckoutComponent } from './components/pages/market/checkout/checkout.component';
import { CreateDealComponent } from './vendor/components/pages/create-deal/create-deal.component';
import { ViewAllDealsComponent } from './vendor/components/pages/view-all-deals/view-all-deals.component';
import { EditDealComponent } from './vendor/components/pages/edit-deal/edit-deal.component';
import { ViewDealVendorComponent } from './vendor/components/pages/view-deal-vendor/view-deal-vendor.component';
import { MarketDealComponent } from './components/pages/market/market-deal/market-deal.component';
import { OrderProcessingResidentialComponent } from './components/pages/market/order-processing-residential/order-processing-residential.component';
import { PaymentCancellationComponent } from './components/pages/market/payment-cancellation/payment-cancellation.component';
import { OrdersComponent } from './components/pages/market/orders/orders.component';
import { OrderConfirmedComponent } from './components/pages/market/order-confirmed/order-confirmed.component';
import { OrderIndividualComponent } from './components/pages/market/order-individual/order-individual.component';
import { VendorOrdersComponent } from './vendor/components/pages/vendor-orders/vendor-orders.component';
import { ViewOrderVendorComponent } from './vendor/components/pages/view-order-vendor/view-order-vendor.component';
import { ActivateComponent } from './components/pages/activate/activate.component';
import { ProcessDealComponent } from './components/pages/market/process-deal/process-deal.component';
import { VendorProfileForUsersComponent } from './components/pages/market/vendor-profile-for-users/vendor-profile-for-users.component';
import { VendorGuard } from './guards/vendor.guard';
import { LoggedInVendorGuard } from './guards/logged-in-vendor.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { VerifyVendorAccountComponent } from './vendor/components/pages/verify-vendor-account/verify-vendor-account.component';
import { CalculatorComponent } from './vendor/components/pages/calculator/calculator.component';
import { ForgotPasswordComponent } from './vendor/components/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './vendor/components/pages/reset-password/reset-password.component';
import { WalletComponent } from './components/pages/wallet/wallet.component';
import { CommunityMemberRegComponent } from './components/pages/community-member-reg/community-member-reg.component';

const routes: Routes = [
  {path:'',component:LandingComponent, canActivate:[LoggedInUserGuard]},
  {path:'register',component:RegisterComponent, canActivate:[LoggedInUserGuard]},
  {path:'login',component:LoginComponent,  canActivate:[LoggedInUserGuard]},
  {path:'registration/activate/:code/:url',component:ActivateComponent},
  {path:'forgotpassword', component:PasswordChangeEmailComponent, canActivate:[LoggedInUserGuard]},
  {path:'registration/reset/:uid/:token', component:PasswordChangeComponent, canActivate:[LoggedInUserGuard]},// path for reset password page
  {path:'onboarding',component:OnboardingComponent, canActivate:[OnboardingGuard]},
  // {path:'home', component:HomeComponent, canActivate:[ResidentialGuard]},
  // {path:'communityprofile', component:CommunityProfileComponent, canActivate:[ResidentialGuard] },
  {path:'viewprofile/:id', component:ViewProfileComponent, canActivate:[ResidentialGuard] },
  {path:'communityprofile/contacts', component:CommunityContactsComponent, canActivate:[ResidentialGuard]},
  {path:'profile', component:ResidentialUserProfileComponent, canActivate:[ResidentialGuard]},
  {path:'editprofile', component:ResidentialUserEditProfileComponent, canActivate:[ResidentialGuard]},
  {path:'support', component:SupportComponent},
  {path: 'changecommunity', component:ChangeCommunityComponent, canActivate:[ResidentialGuard]},
  {path:'communityprofile/communitysurvey', component:SurveyComponent, canActivate:[ResidentialGuard]},
  {path:'profile/interests', component:InterestsComponent, canActivate:[ResidentialGuard]},
  {path:'privacy', component:PrivacySettingsComponent, canActivate:[ResidentialGuard]},
  {path:'product/:id', component:MarketProductComponent, canActivate:[ResidentialGuard]},
  {path:'market',component:MarketHomeComponent, canActivate:[ResidentialGuard]},
  {path:'wallet',component:WalletComponent, canActivate:[ResidentialGuard]},
  {path:'market/deal/:dealid', component:MarketDealComponent, canActivate:[ResidentialGuard]},
  {path:'cart',component:UserCartComponent, canActivate:[ResidentialGuard]},
  {path:'checkout',component:CheckoutComponent, canActivate:[ResidentialGuard]},
  {path:'processorder', component:OrderProcessingResidentialComponent, canActivate:[ResidentialGuard]},
  {path:'processdeal', component:ProcessDealComponent, canActivate:[ResidentialGuard]},
  {path:'paymentcancelled', component:PaymentCancellationComponent, canActivate:[ResidentialGuard]},
  {path:'orders', component:OrdersComponent, canActivate:[ResidentialGuard]},
  {path:'orderconfirmed/:orderId', component:OrderConfirmedComponent, canActivate:[ResidentialGuard]},
  {path:'order/:orderid', component:OrderIndividualComponent, canActivate:[ResidentialGuard]},
  {path:'market/vendor/:shopid', component:VendorProfileForUsersComponent, canActivate:[ResidentialGuard]},

  //Posts...


  {path:'vendor',component:RegisterVendorComponent, canActivate:[LoggedInVendorGuard]},
  {path:'vendor/login', component:LoginVendorComponent, canActivate:[LoggedInVendorGuard]},
  {path:'vendor/account/activate/:code/:url', component:VerifyVendorAccountComponent},
  {path:'vendor/addproduct', component:AddProductComponent, canActivate:[VendorGuard]},
  {path:'vendor/home',component:HomeVendorComponent, canActivate:[VendorGuard]},
  {path:'vendor/product/:id',component:VendorProductPageComponent, canActivate:[VendorGuard]},
  {path:'vendor/profile', component:ViewProfileVendorComponent, canActivate:[VendorGuard]},
  {path:'vendor/editprofile',component:EditProfileVendorComponent, canActivate:[VendorGuard]},
  {path:'vendor/editproduct/:id', component:EditProductComponent},  //canActivate:[VendorGuard]
  {path:"vendor/createdeal/:productid", component:CreateDealComponent, canActivate:[VendorGuard]},
  {path:'vendor/deals', component:ViewAllDealsComponent, canActivate:[VendorGuard]},
  {path:"vendor/editdeal/:dealid", component:EditDealComponent, canActivate:[VendorGuard]},
  {path:"vendor/deal/:dealid", component:ViewDealVendorComponent, canActivate:[VendorGuard]},
  {path:"vendor/orders", component:VendorOrdersComponent, canActivate:[VendorGuard]},
  {path:"vendor/order/:orderId", component:ViewOrderVendorComponent, canActivate:[VendorGuard]},
  {path:"vendor/order/:orderId", component:ViewOrderVendorComponent, canActivate:[VendorGuard]},
  {path:"vendor/calculate", component:CalculatorComponent},
  {path:"vendor/forgotpassword", component:ForgotPasswordComponent},
  {path:"vendor/account/reset/:uid/:token", component:ResetPasswordComponent},




  {path:'admin',component:AdminLoginComponent},
  {path:'admin/home', component:AdminHomeComponent},
  {path:'admin/community/:id',component:ViewCommunityComponent},
  {path:'admin/user/:id',component:ViewUserComponent},

  //Community Member Registration
  { path: 'registration', component: CommunityMemberRegComponent },

  {path:'**', component:NotfoundComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{



}
