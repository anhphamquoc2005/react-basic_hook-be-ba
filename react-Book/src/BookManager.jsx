import CustomModal from "./components/CustomModal";
import BookForm from "./components/BookForm";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  nameBook: yup.string().trim().required("Chưa nhập tên sách."),
  price: yup
    .number()
    .typeError("Chỉ được nhập số.")
    .positive("Giá tiền phải lớn hơn 0.")
    .required("Chưa nhập giá tiền."),
  author: yup.string().trim().required("Chưa nhập tên tác giả."),
});

export default function BookManager() {
  const [books, setBook] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [latestBook, setLatestBook] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEditClick = (book) => {
    setEditingId(book.id);
    reset({
      nameBook: book.nameBook,
      price: book.price,
      author: book.author,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    reset({ nameBook: "", price: "", author: "" });
  };

  const onSubmit = async (data) => {
    if (editingId !== null) {
      const updatedBook = books.map(book => 
        book.id === editingId ? {...book, ...data} : book
      );

      setBook(updatedBook);
      setEditingId(null);
      reset({ nameBook: "", price: "", author: "" });

    } else {
      try {
        await axios.post("https://jsonplaceholder.typicode.com/posts", data);
        const newBook = {
          id: Date.now(),
          ...data,
        };

        setBook([newBook, ...books]);
        setShowModal(true);
        setLatestBook(newBook);
        reset();
      } catch (error) {
        alert("Kết nối thất bại! Vui lòng kiểm tra lại.");
      }
    }
  };

  const removeBook = (id) => {
    setBook(books.filter((book) => book.id !== id));
  };

  return (
    <div>
      <div>
        <h5>Sổ tay thư viện</h5>
        <div>
          <BookForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isEditing={editingId !== null}
            onCancel={handleCancel}
          />
        </div>
      </div>

      <div>
        <h5>Danh sách thư viện</h5>
        <div>
          {books.length === 0 ? (
            <p>Chưa có cuốn sách nào ở đây</p>
          ) : (
            books.map((book) => (
              <div key={book.id}>
                <h4>{book.nameBook}</h4>
                <p>Giá: {book.price}</p>
                <p>Tác giả: {book.author}</p>
                <button onClick={() => removeBook(book.id)}>Xóa</button>
                <button onClick={() => handleEditClick(book)}>Sửa</button>
              </div>
            ))
          )}
        </div>
      </div>

      <CustomModal
        isOpen={showModal}
        title="Sách mới đã được thêm vào thư viện"
        onClose={() => setShowModal(false)}
      >
        {latestBook && (
          <div>
            <h4>{latestBook.nameBook} đã được thêm vào thư viện.</h4>
            <p>Giá: {latestBook.price}</p>
            <p>Tác giả: {latestBook.author}</p>
          </div>
        )}
      </CustomModal>
    </div>
  );
}
