import React, { useRef, useState } from "react";
import { useChatStore } from "../store/UseChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
const MessageInput = () => {
  const [text, settext] = useState("");
  const [imagepreview, setimagepreview] = useState(null);
  const fileinputref = useRef(null);
  const { sendMessages } = useChatStore();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please Select Image File");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setimagepreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setimagepreview(null);
    if (fileinputref.current) fileinputref.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagepreview) return;

    try {
      await sendMessages({
        text: text.trim(),
        image: imagepreview,
      });

      // Clear form
      settext("");
      setimagepreview(null);
      if (fileinputref.current) fileinputref.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
    <div className="p-4 w-full">
      {imagepreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagepreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message... "
            value={text}
            onChange={(e) => settext(e.target.value)}
          />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileinputref}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagepreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileinputref.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-circle "
          disabled={!text.trim() && !imagepreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
