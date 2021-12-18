import Navbar from "../components/Navbar";
import Image from "next/image"
import EntryCard from "../components/EntryCard";

export default function Dashboard() {
	return (
		<>
			<Navbar />
			<div className="p-4 lg:p-10">
				<h1 className="my-4 text-4xl font-bold">Links</h1>
				<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
					<EntryCard title="very hard!" content="very hard!" dateOfNextSend="2020-01-01" />
				</div>

			</div>
		</>
	)
}