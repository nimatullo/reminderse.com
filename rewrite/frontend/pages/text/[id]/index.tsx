import { useEffect, useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";

export default function EditText() {
	const router = useRouter();
	const {id} = router.query;
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [category, setCategory] = useState("");
  const [nextEmailDate, setNextEmailDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		entryService.getText()
	}, []);

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-10">
        Edit text entry
      </h2>
      <form onSubmit={() => {}} className="space-y-5">
        <Fade duration={250}>
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
                <p>Text Content</p>
              </span>
              <textarea
                className="text-entry-area"
                rows={3}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                required
                placeholder="Contents of your text entry"
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
                  placeholder="Category for text"
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
                  value={nextEmailDate}
                  onChange={(e) => setNextEmailDate(e.target.value)}
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
            Add Text Entry
          </button>
        </Fade>
      </form>
    </>
  );
}
