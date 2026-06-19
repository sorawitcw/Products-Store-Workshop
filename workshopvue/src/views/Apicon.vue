<template>
  <div>
    <h1>API CONNECT</h1>
    <v-btn color="success" @click="newItem()">newItem</v-btn>
    <v-row>
      <v-col cols="3" v-for="(item, index) in apidata" :key="index">
        <div>
          <v-card width="350">
            <v-img
              src="https://media.tenor.com/zCTU9e8SmVMAAAAM/1000-yard-stare-cat-meme.gif"
            ></v-img>
            <v-card-title primary-title>
              {{ item.firstname }} {{ item.lastname }}
            </v-card-title>
            <v-card-actions>
              <v-btn color="success" @click="editItem(item)">edit</v-btn>
              <v-btn color="error" @click="deleteItem(item)">delete</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title primary-title>
          {{ savemode }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                name="firstname"
                label="firstname"
                id="firstname"
                v-model="postdata.firstname"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="lastname"
                label="lastname"
                id="lastname"
                v-model="postdata.lastname"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="username" v-model="postdata.username">
              </v-text-field>
            </v-col>
            <v-col cols="6" v-if="id === ''">
              <v-text-field
                label="password"
                type="password"
                v-model="postdata.password"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="age" type="number" v-model="postdata.age">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="['Male', 'Female', 'other']"
                label="gender"
                v-model="postdata.gender"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeItem()">cancel</v-btn>
          <v-btn color="info" text @click="saveSelect()">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      apidata: [],
      id: "",
      postdata: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        gender: "",
        age: null,
        role: "user",
      },
      postdefault: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        gender: "",
        age: null,
        role: "user",
      },
      dialog: false,
    };
  },
  computed: {
    savemode() {
      return this.id === "" ? "NewItem" : "EditItem";
    },
  },
  created() {
    this.getData();
  },
  methods: {
    newItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialog = true;
    },
    editItem(item) {
      this.id = item._id;
      this.postdata = { ...item };
      this.dialog = true;
    },
    closeItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialog = false;
    },
    saveSelect() {
  if (this.id != "") {
    this.savePutdata();
  } else {
    this.savePostdata();
  }
},
    getData() {
      axios.get("http://localhost:3000/users",{
        headers:{
            Authorization: `Bearer $token`
        }
      }).then((response) => {
        console.log(response.data);
        this.apidata = response.data;
      });
    },
    async savePostdata() {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/users",
          this.postdata,
        );
        console.log(data);
        alert("save complete");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    },
    //put
    async savePutdata() {
      try {
        const { data } = await axios.put(
          'http://localhost:3000/users/'+this.id,
          this.postdata,
        );
        console.log(data);
        alert("update complete");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    },
    //delete
    async deleteItem(item) {
        if(confirm('Delete '+item.username))
      try {
        const { data } = await axios.delete(
          'http://localhost:3000/users/'+item._id);
        console.log(data);
        alert("delete complete");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    },
  },
};
</script>

<style></style>
