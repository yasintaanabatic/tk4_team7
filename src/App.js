import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";
import { uid } from "uid";
import axios from "axios";

let api = axios.create({ baseURL: "https://63df6431a76cfd410581c931.mockapi.io" });

function App() {
  const [mahasiswas, setMahasiswas] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [gender, setGender] =useState();

  const [formData, setFormData] = useState({
    nim:"",
    nama: "",
    alamat:"",
    jeniskelamin:"",
    hobi:"",
    komentar:""
  });

  useEffect(() => {
    // fetch data dsini dan set contact

    api.get("/mahasiswa").then((res) => {
      setMahasiswas(res.data);
      console.log(res.data);
    });
  }, []);

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.name] = e.target.value;
    setFormData(newFormState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...mahasiswas];

    if (formData.nim === "") {
      return false;
    }
    if (formData.nama === "") {
      return false;
    }
    if (formData.alamat === "") {
      return false;
    }
    if (formData.jeniskelamin === "") {
      return false;
    }
    if (formData.hobi === "") {
      return false;
    }
    if (formData.komentar === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((mahasiswa) => {
        if (mahasiswa.id === isUpdate.id) {
          mahasiswa.nim = formData.nim;
          mahasiswa.nama = formData.nama;
          mahasiswa.alamat = formData.alamat;
          mahasiswa.jeniskelamin = formData.jeniskelamin;
          mahasiswa.hobi = formData.hobi;
          mahasiswa.komentar = formData.komentar;
        }
      });
      api
        .put("/mahasiswa/" + isUpdate.id, {
          id: isUpdate.id,
          nim: formData.nim,
          nama: formData.nama,
          alamat: formData.alamat,
          jeniskelamin: formData.jeniskelamin,
          hobi: formData.hobi,
          komentar:formData.komentar,
        })
        .then(() => {
          alert("Data berhasil di update");
        });
      // update berdasarkan id
    } else {
      let toSave = {
        id: uid(),
        nim: formData.nim,
        nama: formData.nama,
        alamat: formData.alamat,
        jeniskelamin: formData.jeniskelamin,
        hobi: formData.hobi,
        komentar:formData.komentar,
      };
      data.push(toSave);

      // menambahkan data
      api.post("/mahasiswa", toSave).then(() => {
        alert("Data berhasil ditambah");
      });
    }
    setMahasiswas(data);
    setIsUpdate(false);
    setFormData({ nim:"",
    nama: "",
    alamat:"",
    jeniskelamin:"",
    hobi:"",
    komentar:"" });
  }

  function handleEdit(id) {
    // cari data di state
    // isi data ke state form
    let data = [...mahasiswas];
    let foundData = data.find((mahasiswa) => mahasiswa.id === id);
    setIsUpdate({ status: true, id: id });
    setFormData({ nim: foundData.nim, nama: foundData.nama, alamat: foundData.alamat, jeniskelamin: foundData.jeniskelamin, hobi: foundData.hobi, komentar: foundData.komentar });
  }

  function handleDelete(id) {
    let data = [...mahasiswas];
    let filteredData = data.filter((mahasiswa) => mahasiswa.id !== id);

    // menghapus data
    api.delete("/mahasiswas/" + id).then(() => alert("Data berhasil dihapus"));
    setMahasiswas(filteredData);
  }

  return (
    <div className="App">
      <div className=" bg-white pb-3 mx-auto" style={{ width: 400 }}>
        <h1 className="px-3 py-3 font-weight-bold">Mahasiswa Binus</h1>
        <h5>{gender}</h5>
        <form onSubmit={handleSubmit} className="px-3 py-4">
          <div className="form-group mt-3">
            <label htmlFor="">Nim</label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              value={formData.nim}
              name="nim"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Nama</label>
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              value={formData.nama}
              name="nama"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Alamat</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.alamat}
              className="form-control"
              name="alamat"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Jenis kelamin</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.jeniskelamin}
              className="form-control"
              name="jeniskelamin"
            />
            {/* <input type="radio" name="jeniskelamin" value={formData.jeniskelamin} onChange={e => setGender(e.target.value)} />Laki-laki
            <input type="radio" name="jeniskelamin" value={formData.jeniskelamin} onChange={e => setGender(e.target.value)} />Perempuan */}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Hobi</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.hobi}
              className="form-control"
              name="hobi"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">Komentar</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.komentar}
              className="form-control"
              name="komentar"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
      {/* <div style={{ marginTop: 800 }}> */}
        <List
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={mahasiswas}
        />
      {/* </div> */}
    </div>
  );
}

export default App;
