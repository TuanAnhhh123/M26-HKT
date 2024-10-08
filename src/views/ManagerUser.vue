<template>
    <div class="user-manager">
      <h2>User Management</h2>
      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Search by name or email" />
        <button class="btn add-btn" @click="showAddUserForm">Add New User</button>
      </div>
  
      <table class="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="6">No users found.</td>
          </tr>
          <tr v-for="(user, index) in filteredUsers" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.dob }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="btn edit-btn" @click="editUser(user)">Edit</button>
              <button class="btn delete-btn" @click="deleteUser(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="isFormVisible" class="add-user-form">
        <h3>{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
        <form @submit.prevent="submitForm">
          <label>
            Name:
            <input v-model="formData.name" type="text" required />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </label>
  
          <label>
            Gender:
            <select v-model="formData.gender">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
  
          <label>
            Date of Birth:
            <input v-model="formData.dob" type="date" required />
            <span v-if="errors.dob" class="error">{{ errors.dob }}</span>
          </label>
  
          <label>
            Email:
            <input v-model="formData.email" type="email" required />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </label>
  
          <button type="submit" class="btn">{{ isEditing ? 'Update' : 'Add' }}</button>
          <button type="button" class="btn close-btn" @click="hideAddUserForm">Close</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    setup() {
      const searchQuery = ref('');
      const users = ref([]);
      const isFormVisible = ref(false);
      const isEditing = ref(false);
  
      const formData = ref({
        name: '',
        gender: 'Male',
        dob: '',
        email: ''
      });
  
      const errors = ref({
        name: null,
        email: null,
        dob: null
      });
  
      const showAddUserForm = () => {
        isFormVisible.value = true;
        isEditing.value = false;
        resetForm();
      };
  
      const hideAddUserForm = () => {
        isFormVisible.value = false;
        resetForm();
      };
  
      const resetForm = () => {
        formData.value = { name: '', gender: 'Male', dob: '', email: '' };
        errors.value = { name: null, email: null, dob: null };
      };
  
      const filteredUsers = computed(() => {
        return users.value.filter(user =>
          user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
  
      const validateForm = () => {
        let isValid = true;
        errors.value = { name: null, email: null, dob: null };
  
        if (!formData.value.name) {
          errors.value.name = 'Name is required';
          isValid = false;
        }
  
        if (!formData.value.email) {
          errors.value.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
          errors.value.email = 'Invalid email format';
          isValid = false;
        } else if (users.value.some(user => user.email === formData.value.email && user.email !== (isEditing.value ? formData.value.originalEmail : ''))) {
          errors.value.email = 'Email already exists';
          isValid = false;
        }
  
        const today = new Date().toISOString().split('T')[0];
        if (!formData.value.dob || formData.value.dob > today) {
          errors.value.dob = 'Date of birth cannot be in the future';
          isValid = false;
        }
  
        return isValid;
      };
  
      const submitForm = () => {
        if (validateForm()) {
          if (isEditing.value) {
            const index = users.value.findIndex(user => user.email === formData.value.originalEmail);
            if (index !== -1) {
              users.value[index] = { ...formData.value };
            }
          } else {
            users.value.push({ ...formData.value });
          }
          localStorage.setItem('users', JSON.stringify(users.value));
          hideAddUserForm();
        }
      };
  
      const editUser = (user) => {
        formData.value = { ...user, originalEmail: user.email }; 
        isFormVisible.value = true; 
        isEditing.value = true; 
      };
  
      const deleteUser = (user) => {
        const confirmed = window.confirm(`Bạn có chắc muốn xóa tài khoản này không ?`);
        if (confirmed) {
          users.value = users.value.filter(u => u.email !== user.email);
          localStorage.setItem('users', JSON.stringify(users.value));
        }
      };
  
      onMounted(() => {

        const storedUsers = JSON.parse(localStorage.getItem('users'));
        users.value = storedUsers ? storedUsers : 
        localStorage.setItem('users', JSON.stringify(users.value));
      });
  
      return {
        searchQuery,
        users,
        filteredUsers,
        isFormVisible,
        isEditing,
        showAddUserForm,
        hideAddUserForm,
        formData,
        errors,
        submitForm,
        editUser,
        deleteUser
      };
    },
  };
  </script>
  
  <style scoped>
  .user-manager {
    padding: 20px;
  }
  
  h2 {
    color: #333;
  }
  
  .search-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 70%;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #080000;
  }
  
  .add-btn {
    background-color: #28a745;
  }
  
  .edit-btn {
    background-color: #ffc107;
  }
  
  .delete-btn {
    background-color: #dc3545;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .user-table th,
  .user-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .user-table th {
    background-color: #070000;
    color: #e10c0c;
  }
  
  .add-user-form {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    border-radius: 4px;
  }
  
  .add-user-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    display: block;
  }
  </style>
  