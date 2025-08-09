import React from "react";
import Button from "./Button";

const Footer = ({page, setPage, isLeftDisabled, isRightDisabled, maxPage}) => {
    return (
        <footer className="flex justify-between items-center text-white mt-10 movie-card">
            <Button direction={"left"} isDisabled={isLeftDisabled} page={page} setPage={setPage}/>
            <p>
                <span className="font-bold">{page}</span> / {maxPage}
            </p>
            <Button
                direction={"right"}
                isDisabled={isRightDisabled}
                page={page}
                setPage={setPage}
            />
        </footer>
    );
};

export default Footer;
