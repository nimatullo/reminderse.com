import Link from "next/link"
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";


const Navbar = () => {
	const [active, setActive] = useState(false);

	const handleClick = () => {
		setActive(!active);
	};

	return (
		<>
			<div className="navbar mb-2 shadow-lg bg-reminderse-purple text-neutral-content">
				<div className="flex-1 px-2 mx-2">
					<span className="text-lg font-bold">
						Reminderse
					</span>
				</div>
				<div className="flex-none px-2 mx-2 lg:flex">
					<div className="flex items-stretch">
						<div data-tip="Home" className="tooltip tooltip-bottom">
						<Link href="/">
							<a className="btn btn-ghost btn-md rounded-btn ">
								<AiFillHome style={{ "height": "1.5em", "width": "1.5em" }} />
							</a>
						</Link>
						</div>
						<div data-tip="Dashboard" className="tooltip tooltip-bottom">
						<Link href="/dashboard">
							<a className="btn btn-ghost btn-md rounded-btn">
								<BsFillGridFill style={{ "height": "1.5em", "width": "1.5em" }} />
							</a>
						</Link>
						</div>
						<div data-tip="Add Entry" className="tooltip tooltip-bottom">

						<Link href="/add">
							<a className="btn btn-ghost btn-md rounded-btn">
								<AiFillPlusCircle style={{ "height": "1.5em", "width": "1.5em" }} />
							</a>
						</Link>
						</div>
						<div data-tip="Settings" className="tooltip tooltip-bottom">

						<Link href="/settings">

							<a className="btn btn-ghost btn-md rounded-btn">
								<IoMdSettings style={{ "height": "1.5em", "width": "1.5em" }} />
							</a>
						</Link>
						</div>
						<div data-tip="Log Out" className="tooltip tooltip-bottom">
						<Link href="/logout">
							<a className="btn btn-ghost btn-md rounded-btn">
								<BiLogOut style={{ "height": "1.5em", "width": "1.5em" }} />
							</a>
						</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};

export default Navbar;