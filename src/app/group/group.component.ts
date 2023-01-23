import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from '../models/Contact';
import { ContactGroups } from '../models/ContactGroups';
import { GroupsService } from '../services/groups/groups.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  deleteContactFromGroup: FormGroup;

  @Input() group: ContactGroups;
  constructor(
    private contactGroupService: GroupsService,
    private _formBuilder: FormBuilder
  ) {
    this.deleteContactFromGroup = this._formBuilder.group({
      idContact: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitDeleteContactFromGroup(formDeleteContactToGroup: FormGroup) {
    let splited = formDeleteContactToGroup.value.idContact.split('|');
    let id = splited[0];
    let mail = splited[1];

    let contact: Contact = {
      email: mail,
    };

    this.contactGroupService
      .deleteUserOfGroup$(id, contact)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
