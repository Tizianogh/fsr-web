import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  addInputRow() {
    const form = document.getElementById('add-contact-from');

    form.innerHTML += `<div>
            <input class="for-button-delete" type="text" name="profil-phone[]" id="profil-phone" placeholder="Numero">
            <a onclick="this.parentNode.remove()" class="button error button-delete"><img class="trash-icon" src="/assets/icons/svg/trash.svg" alt="Supprimer"></a>
        </div>`;
  }
}
