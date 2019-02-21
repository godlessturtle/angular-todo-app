import {Component} from '@angular/core';
import {StringsServiceService} from './strings-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends StringsServiceService {
  todos = [];
  dones = [];
  msg = '';

  // uygulama başlatıldığında local storage güncelle
  ngOnInit() {
    this.setTodos();
  }

  // yapılacaklar listesine ekleme
  addTodo(todo) {
    if (todo.value !== '') {
      this.todos.push(todo.value);
      todo.value = '';
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.setTodos();
      this.msg = '';
    } else {
      this.msg = 'Bu alan boş bırakılamaz';
    }
  }

  // local storage object oluşturma ve güncelleme
  setTodos() {
    if (!localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    } else {
      this.todos = JSON.parse(localStorage.getItem('todos'));
    }

    if (!localStorage.getItem('dones')) {
      localStorage.setItem('dones', JSON.stringify(this.dones));
    } else {
      this.dones = JSON.parse(localStorage.getItem('dones'));
    }

  }

  // yapılacaklar listesinden eleman kaldır ve localstorage de güncelle
  removeTodo(todo) {
    const index = this.todos.indexOf(todo.innerHTML);
    this.deleteArrayItem(this.todos, index);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.msg = '';
  }

  // yapılacak listesindeki bir elemanı tamamlandı olarak işaretle
  markAsDone(todo) {
    const index = this.todos.indexOf(todo.innerHTML);
    this.dones.push(todo.innerHTML);
    this.deleteArrayItem(this.todos, index);

    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('dones', JSON.stringify(this.dones));
    this.msg = '';
  }

  // tamamlananlar listesinden eleman kaldır ve localstorage de güncelle
  removeDone(done) {
    const index = this.dones.indexOf(done.innerHTML);
    this.deleteArrayItem(this.dones, index);
    localStorage.setItem('dones', JSON.stringify(this.dones));
    this.msg = '';
  }

  // diziden belirtilen index numarasındaki elemanı sil
  deleteArrayItem(arr, index) {
    if (index > -1) {
      arr.splice(index, 1);
    }
  }


}
