import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import Fade from "react-reveal/Fade";
import Navbar from "../../../components/Navbar";
import Snackbar from "../../../components/Snackbar";
import useMessage from "../../../context/customMessageHook";
import { entryService } from "../../../service/entry.service";

export default function EditLink() {
  const router = useRouter();
  const { id } = router.query;

  const {setMessage} = useMessage();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [nextEmailDate, setNextEmailDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    entryService
      .getLink(id as string)
      .then((entry) => {
        setTitle(entry.entry_title);
        setUrl(entry.url);
        setCategory(entry.category);
        setNextEmailDate(new Date(Date.parse(entry.date)));
      })
      .catch((err) => {
        setMessage({
          message: "Something went wrong. Please try again.",
          type: "error",
          show: true,
        });
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="p-4 max-w-lg w-full space-y-5">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-10">
            Edit link entry
          </h2>
          <Snackbar/>
          <form className="space-y-5" onSubmit={() => {}}>
            <Fade duration={500}>
              <div className="form-control">
                <label
                  htmlFor="title"
                  className="input-group input-group-vertical input-group-md"
                >
                  <span className="bg bg-secondary" style={{ color: "white" }}>
                    Entry Title
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Title"
                    className="input input-bordered"
                  />
                </label>
              </div>
              <div className="form-control">
                <label
                  htmlFor="url"
                  className="input-group input-group-vertical input-group-md"
                >
                  <span
                    className="bg bg-secondary flex justify-between"
                    style={{ color: "white" }}
                  >
                    <p>URL</p>
                  </span>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    placeholder="https://reminderse.com"
                    className="input input-bordered"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div className="form-control lg:col-span-2">
                  <label
                    htmlFor="category"
                    className="input-group input-group-vertical input-group-md"
                  >
                    <span
                      className="bg bg-secondary flex justify-between"
                      style={{ color: "white" }}
                    >
                      <p>Category (optional)</p>
                    </span>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Category for link"
                      className="input input-bordered"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label
                    htmlFor="date"
                    className="input-group input-group-vertical input-group-md"
                  >
                    <span
                      className="bg bg-secondary flex justify-between"
                      style={{ color: "white" }}
                    >
                      <p>Next email date</p>
                    </span>
                    <input
                      type="date"
                      value={nextEmailDate.toISOString().split("T")[0]}
                      onChange={(e) =>
                        setNextEmailDate(new Date(e.target.value))
                      }
                      required
                      min={new Date().toISOString().split("T")[0]}
                      placeholder="Date of next send"
                      className="input input-bordered"
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className={`${
                  isLoading ? "loading" : ""
                } btn btn-primary w-full shadow-primary/50 shadow-sm`}
              >
                <IoMdAddCircle className="mr-2" />
                Add Link Entry
              </button>
            </Fade>
          </form>
        </div>
      </div>
    </>
  );
}
