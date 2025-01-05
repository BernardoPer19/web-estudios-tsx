import useAuth from "../../hooks/useAuth";

export const StudentData = () => {
  const { user } = useAuth();

  return (
    <div
      className="flex justify-center  min-h-76"
     
    >
      {user ? (
        <div
          className="w-4/5 md:w-3/5 lg:w-2/5 p-6 rounded-lg shadow-lg"
          style={{ backgroundColor: "#31304D" }} // Fondo de la tarjeta
        >
          <div className="text-center">
            <img
              src="https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png"
              alt="User avatar"
              className="w-24 h-24 mx-auto rounded-full border-4"
              style={{
                borderColor: "#B6BBC4", // Borde de la imagen
              }}
            />
            <h1
              className="text-2xl font-bold mt-4"
              style={{ color: "#F0ECE5" }} // Color del texto principal
            >
              {user.email}
            </h1>
            <h2
              className="text-sm italic"
              style={{ color: "#B6BBC4" }} // Color del texto secundario
            >
              Rol: {user.role}
            </h2>
          </div>

          <div className="mt-8">
            <h3
              className="text-xl font-semibold mb-4 underline"
              style={{ color: "#F0ECE5" }} // Color de los títulos
            >
              Cursos Inscritos:
            </h3>
            <div className="space-y-4">
              {user.coursesEnrolled.map((course, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg shadow-md"
                  style={{
                    backgroundColor: "#B6BBC4", // Fondo de las tarjetas de cursos
                    color: "#31304D", // Texto en las tarjetas
                  }}
                >
                  <h4 className="font-bold text-lg">{course.title}</h4>
                  <p className="mt-1">Precio: ${course.price}</p>
                </div>
              ))}
            </div>
          </div>

          <p
            className="text-center text-sm mt-6"
            style={{ color: "#B6BBC4" }} // Color de la fecha
          >
            Miembro desde:{" "}
            <span
              className="font-semibold"
              style={{ color: "#F0ECE5" }} // Resaltado de la fecha
            >
              {new Date(user.createAT).toLocaleDateString()}
            </span>
          </p>
        </div>
      ) : (
        <div
          className="text-xl font-semibold"
          style={{ color: "#F0ECE5" }} // Mensaje en caso de no haber usuario
        >
          Por favor, inicia sesión para ver tu información.
        </div>
      )}
    </div>
  );
};
