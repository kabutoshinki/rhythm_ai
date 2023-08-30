function Collection({ imgSrc, name }: any) {
  return (
    <div
      className="min-w-[250px] max-h-[140px] bg-primary 
        w-[250px] h-[100%]   mx-2 rounded-lg overflow-hidden relative cursor-pointer"
    >
      <picture>
        <img src={imgSrc} alt="" className="w-full h-full object-cover" />
      </picture>
      <div className="w-full h-[40px] bg-collectionBg absolute bottom-0 flex items-center">
        <h2 className="px-2 text-white font-bold">{name}</h2>
      </div>
    </div>
  );
}

export default Collection;
