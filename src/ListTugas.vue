<template>
    <div class="container">
        <h2 class="border-bottom mb-8 text-center">List Tugas Mata Kuliah</h2>
            <div class="row">
                <div class="col-md-8">
                <form @submit.prevent="add">
                    <base-input type="hidden" v-model="tugasMK.id">
                    </base-input>
                    <base-input type="text" v-model.trim="tugasMK.nama_mk" label="Mata Kuliah" placeholder="Nama Mata Kuliah"
                        id="tugasMK-nama_mk" :error="errors['nama_mk']"></base-input>
                    <div class="form-group">
                        <label>Deskripsi Tugas</label>
                        <textarea class="form-control" rows="5" placeholder="Deskripsi Tugas Mata Kuliah"
                            :value="tugasMK.deskripsi" @input="tugasMK.deskripsi = $event.target.value" 
                            :error="errors['deskripsi']"></textarea>
                    </div>
                    <base-input type="text" v-model.trim="tugasMK.deadline" label="Deadline" placeholder="Deadline Tugas"
                        id="tugasMK-deadline" :error="errors['deadline']"></base-input>
                    <base-select label="Metode Pengumpulan" v-model="tugasMK.metode" :options="metode"
                        placeholder="Pilih Metode Pengumpulan" :error="errors['metode']"></base-select>
                    <base-checkbox-group label="Bentuk Pengumpulan" v-model="tugasMK.bentuk" :options="bentuk" inline
                        id="tugasMK-bentuk" :error="errors['bentuk']">
                    </base-checkbox-group>
                    <base-radio-group label="Jenis Tugas" name="jenis" :options="jenisOptions" v-model="tugasMK.jenis" 
                    :error="errors['jenis']">
                    </base-radio-group>
                    <hr />
                    <div class="form-group">
                        <button type="submit" v-show="!updateSubmit" class="btn btn-md btn-primary">Add</button>
                        <!-- jika tidak update maka tombol update tidak muncul -->
                        <button type="button" v-show="updateSubmit" @click="update(tugasMK)" class="btn btn-lg btn-info">
                            Update
                        </button>
                        <!-- jika tombol edit di klik maka tombol add akan berubah menjadi update -->
                    </div>
                </form>
                </div>
                <div class="col-md-4">
                    <table>
                        <thead>
                            <tr>
                                <th class="border border-info">Nama Mata Kuliah</th>
                                <th class="border border-info">Deskripsi</th>
                                <th class="border border-info">Deadline</th>
                                <th class="border border-info">Metode Pengumpulan</th>
                                <th class="border border-info">Bentuk Pengumpulan</th>
                                <th class="border border-info">Jenis Tugas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="mhs in mahasiswa" :key="mhs.id">
                                <td class="border border-info">{{ mhs.nama_mk }}</td>
                                <td class="border border-info">{{ mhs.deskripsi }}</td>
                                <td class="border border-info">{{ mhs.deadline }}</td>
                                <td class="border border-info">{{ mhs.metode }}</td>
                                <td class="border border-info">
                                <span v-for="(item, index) in mhs.bentuk" :key="index">{{ item }} </span>
                                </td>
                                <td class="border border-info">{{ mhs.jenis }}</td>
                                <td>
                                    <button @click="edit(mhs)" class="btn btn-md btn-info">Edit</button>
                                    <button @click="del(mhs)" class="btn btn-md btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            tugasMK: {
                id: "",
                nama_mk: "",
                deskripsi: "",
                deadline: "",
                metode: "",
                bentuk: [],
                jenis: "",
            },
            metode: [
                { text: "Lebih Awal (Nilai A)" },
                { text: "Tepat Waktu (Nilai AB)" },
                { text: "Terlambat (Nilai C)" },
            ],
            bentuk: [
                { value: "Laporan", text: "Laporan" },
                { value: "Video", text: "Video" },
            ],
            jenisOptions: [
                { text: "Individu", value: "Individu"},
                { text: "Kelompok", value: "Kelompok"},
            ],
            mahasiswa: [],
            updateSubmit: false,
            errors: {},
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            axios
                .get("http://localhost:3000/mahasiswa")
                .then((res) => {
                    this.mahasiswa = res.data; //respon dari rest api dimasukan ke mahasiswa
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        add() {
            axios.post("http://localhost:3000/mahasiswa/", this.tugasMK).then((res) => {
                this.load();
                this.tugasMK.nama_mk = "";
                this.tugasMK.deskripsi = "";
                this.tugasMK.deadline = "";
                this.tugasMK.metode = "";
                this.tugasMK.bentuk = "";
                this.tugasMK.jenis = "";
            });
        },
        edit(mhs) {
            this.updateSubmit = true;
            this.tugasMK.id = mhs.id;
            this.tugasMK.nama_mk = mhs.nama_mk;
            this.tugasMK.deskripsi = mhs.deskripsi;
            this.tugasMK.deadline = mhs.deadline;
            this.tugasMK.metode = mhs.metode;
            this.tugasMK.bentuk = mhs.bentuk;
            this.tugasMK.jenis = mhs.jenis;
        },
        update(tugasMK) {
            if (!tugasMK.id) {
                console.log("Error: 'id' property is not defined");
                return;
            }
            return axios
                .put("http://localhost:3000/mahasiswa/" + tugasMK.id, {
                    nama_mk: this.tugasMK.nama_mk,
                    deskripsi: this.tugasMK.deskripsi,
                    deadline: this.tugasMK.deadline,
                    metode: this.tugasMK.metode,
                    bentuk: this.tugasMK.bentuk,
                    jenis: this.tugasMK.jenis
                })
                .then((res) => {
                    this.load();
                    this.tugasMK.id = "";
                    this.tugasMK.nama_mk = "";
                    this.tugasMK.deskripsi = "";
                    this.tugasMK.deadline = "";
                    this.tugasMK.metode = "";
                    this.tugasMK.bentuk = "";
                    this.tugasMK.jenis = "";
                    this.updateSubmit = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        del(mhs) {
            axios.delete("http://localhost:3000/mahasiswa/" + mhs.id).then((res) => {
                this.load();
                let index = this.mahasiswa.indexOf(tugasMK.nama_mk
                    , tugasMK.deskripsi
                    , tugasMK.deadline
                    , tugasMK.metode
                    , tugasMK.bentuk
                    , tugasMK.jenis);
                this.mahasiswa.splice(index, 6);
            });
        },
    },
};
</script>

<style>
    input {
        display: block;
        margin: 10px auto;
    }
    textarea {
        display: block;
        margin: auto;
    }
    th {
        padding: 20px;
    }    
    button {
        margin: 10px 10px;
    }
</style>

        // add() {
        //     this.errors = {
        //         nama_mk: ["Kolom Mata Kuliah masih kosong"],
        //         deskripsi: ["Kolom Deskripsi masih kosong"],
        //         deadline: ["Kolom Deadline masih kosong"],
        //         metode: ["Kolom Metode Pengumpulan masih kosong"],
        //         bentuk: ["Kolom Bentuk Pengumpulan masih kosong"],
        //         jenis: ["Kolom Jenis Tugas masih kosong"],
        //     };
        // },