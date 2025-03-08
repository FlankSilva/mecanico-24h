type ImageUploadProps = {
  selectedFile: File | null;
  previewUrl: string | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
};

export function ImageUpload({
  selectedFile,
  setSelectedFile,
  previewUrl,
  setPreviewUrl,
}: ImageUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('Apenas imagens PNG e JPEG são permitidas!');
      event.target.value = '';
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[14px] text-blue-500 font-bold mt-3">
        Imagem do estabelecimento (PNG ou JPEG)
      </p>

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
      />

      {previewUrl && (
        <div>
          <p className="text-sm text-gray-600">Prévia da imagem:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-32 object-cover border rounded"
          />
        </div>
      )}
    </div>
  );
}
