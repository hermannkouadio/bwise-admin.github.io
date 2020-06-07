import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { OrderItem } from '../../models/order-item';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderDetailForm: FormGroup;
  order: Order;
  items: Array<OrderItem>;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private customService: CustomerService, private orderService: OrderService) {
    this.order = new Order();
    this.items = new Array<OrderItem>();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.order.ordId = +params.get('orderId');
    });

    // get product from API
    this.orderService.getOne(this.order.ordId, this.customService.getToken()).subscribe(resp => {

      this.order = resp;
      console.log('Category: ' + JSON.stringify(this.order));
      // init formgroup
      this.orderDetailForm = this.fb.group({
        id: [this.order.ordId],
        label: [this.order.owner],
      });
    });

    // get order items
    this.orderService.getAllItems(this.order.ordId, this.customService.getToken()).subscribe(resp => {
      this.items = resp;
      console.log('Items: ' + JSON.stringify(this.items));
    });
  }

}
