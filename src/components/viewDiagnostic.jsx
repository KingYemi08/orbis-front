import { useGlobal } from "../context/globalContext";

export default function ViewDiagnostic() {
  const { singleDiagnostic } = useGlobal();
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-120 md:min-w-120 min-w-80">
        <div className="flex justify-between relative">
          <div>
            <h2 className="pb-1 font-semibold">Patient's Symptoms</h2>
            <ul className="text-gray-600 text-sm">
              {singleDiagnostic.symptoms.map((s) => (
                <li className="capitalize">{s}</li>
              ))}
            </ul>
          </div>
          <div className="absolute right-0">
            <p className="text-[12px] text-gray-600">
              Created by <br /> Dr. {singleDiagnostic.doctor.name} on <br />{" "}
              {singleDiagnostic.createdAt.slice(0, 10)}{" "}
              {singleDiagnostic.createdAt.slice(11, 16)}{" "}
              {parseInt(singleDiagnostic.createdAt.slice(11, 13)) >= 12
                ? "PM"
                : "AM"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="pb-1 font-semibold text-left">Diagnosis</h2>
          <p className="text-gray-600">{singleDiagnostic.diagnosis}</p>
        </div>
        <div className="mt-3">
          <h2 className="pb-1 font-semibold text-left">Recomendation</h2>
          <p className="text-gray-600">{singleDiagnostic.prescription}</p>
        </div>
      </div>
    </div>
  );
}
