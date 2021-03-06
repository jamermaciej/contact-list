import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts$: Observable<Contact[]>;
  displayedColumns = ['name', 'surname', 'dateOfBirth', 'photoUrl', 'actions'];
  contacts = new MatTableDataSource<Contact>();
  private subscription: Subscription;

  constructor(private contactsService: ContactsService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.contactsService.getContactListObs().subscribe(contacts => {
      this.contacts.data = contacts;
    });
  }

  applyFilter(filterValue: string) {
    this.contacts.filter = filterValue.trim().toLowerCase();
  }

  editContact(contact: Contact) {
    this.router.navigate(['/contacts', contact.id ]);
  }

  removeContact(index: number) {
    this.contactsService.removeContact(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
