import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { IoMdAddCircle } from "react-icons/io";

export default function AddPage() {
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function handleLinkAdd() {
		//fart
	}

	return (
		<>
			<Navbar />
			<div className="min-h-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="p-4 max-w-lg w-full space-y-5">
					<div className="tabs tabs-boxed justify-center">
						<div className="tab tab-active">Add Link</div>
						<div className="tab">Add Text</div>
					</div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-10">New link</h2>
					{/* {error && (
						<div className="alert alert-error">
							<div className="flex-1">
								<BiErrorCircle className="w-6 h-6 mx-2" />
								<label>{error}</label>
							</div>
						</div>
					)} */}
					<div className="form-control">
						<label htmlFor="title" className="input-group input-group-vertical input-group-md">
							<span className="bg bg-secondary" style={{ "color": "white" }}>Entry Title</span>
							<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" className="input input-bordered" />
						</label>
					</div>
					<div className="form-control">
						<label htmlFor="url" className="input-group input-group-vertical input-group-md">
							<span className="bg bg-secondary flex justify-between" style={{ "color": "white" }}>
								<p>URL</p>
							</span>
							<input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="https://reminderse.com" className="input input-bordered" />
						</label>
					</div>
					<div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
						<div className="form-control lg:col-span-2">
							<label htmlFor="category" className="input-group input-group-vertical input-group-md">
								<span className="bg bg-secondary flex justify-between" style={{ "color": "white" }}>
									<p>Category</p>
								</span>
								<input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="Category for link" className="input input-bordered" />
							</label>
						</div>
						<div className="form-control">
							<label htmlFor="date" className="input-group input-group-vertical input-group-md">
								<span className="bg bg-secondary flex justify-between" style={{ "color": "white" }}>
									<p>Next email date</p>
								</span>
								<input type="date" value="2018-07-22" onChange={(e) => setUrl(e.target.value)} required placeholder="Date of next send" className="input input-bordered" />
							</label>
						</div>

					</div>
					<button onClick={handleLinkAdd} className={`${isLoading ? "loading" : ""} btn btn-primary w-full shadow-primary/50 shadow-sm`}>
						<IoMdAddCircle className="mr-2" />
						Add Link
					</button>
				</div>
			</div>
		</>
	)
}