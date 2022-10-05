const Loading = () => {
  return (
    <div className="absolute flex justify-center items-center h-full w-full z-10">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
    </div>
  );
}

export default Loading