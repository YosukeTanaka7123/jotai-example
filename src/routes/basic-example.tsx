import { createFileRoute } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";

export const Route = createFileRoute("/basic-example")({
  component: RouteComponent,
});

type Person = {
  name: string;
  age: number;
};
type PersonMap = Record<number, Person>;
const personMapAtom = atom<PersonMap>({});

function RouteComponent() {
  const [personMap, setPersonMap] = useAtom(personMapAtom);

  console.log("rendering BasicRoot");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          type="button"
          className="w-24 cursor-pointer bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => {
            setPersonMap((prev) => ({
              ...prev,
              [Object.keys(prev).length + 1]: {
                name: `Person ${Object.keys(prev).length + 1}`,
                age: Math.floor(Math.random() * 100),
              },
            }));
          }}
        >
          add
        </button>
        <button
          type="button"
          className="w-24 cursor-pointer bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => {
            setPersonMap((prev) => {
              const newMap = { ...prev };
              const randomId =
                Math.floor(Math.random() * Object.keys(prev).length) + 1;
              if (newMap[randomId]) {
                newMap[randomId].age += 1; // Increment age by 1
              }
              return newMap;
            });
          }}
        >
          update
        </button>

        <button
          type="button"
          className="w-24 cursor-pointer bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => {
            setPersonMap((prev) => {
              const newMap = { ...prev };
              const randomId =
                Math.floor(Math.random() * Object.keys(prev).length) + 1;
              delete newMap[randomId]; // Remove a random person
              return newMap;
            });
          }}
        >
          delete
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        {Object.entries(personMap).map(([id, person]) => (
          <PersonView key={id} {...person} />
        ))}
      </div>
    </div>
  );
}

type PersonViewProps = Person;
const PersonView = (props: PersonViewProps) => {
  console.log("rendering PersonView", props);

  return <div className="border p-2">{`${props.name}: ${props.age}歳`}</div>;
};
