<template>
  <div>
    <v-app-bar app color="primary" dark>
      
      <v-toolbar-title>CAPYSHOP</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text to="/home" router>
        HOME
      </v-btn>

      <v-btn text to="/productview" router>
        STORE
      </v-btn>

      <v-menu offset-y>
  <template v-slot:activator="{ on, attrs }">
    <v-btn
      text
      v-bind="attrs"
      v-on="on"
    >
      ADMIN
    </v-btn>
  </template>

  <v-list>
    <v-list-item @click="$router.push('/admin/products')">
      <v-list-item-title>
        Manage Products
      </v-list-item-title>
    </v-list-item>

    <v-list-item @click="$router.push('/admin/orders')">
      <v-list-item-title>
        Manage Orders
      </v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>

      <v-btn icon class="ml-3" @click="$router.push('/profile')">
        <v-avatar size="36">
          <v-img
            src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-svg-download-png-456322.png"
            alt="avatar"
          />
        </v-avatar>
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {}
</script>