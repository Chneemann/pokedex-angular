import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/page/pokemon-list/pokemon-list.component';
import { PrivacyPolicyComponent } from './components/legal/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './components/legal/legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
