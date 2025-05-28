import { createFileRoute } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { memo, useMemo } from "react";

export const Route = createFileRoute("/select-example")({
  component: RouteComponent,
});

type Person = {
  id: string;
  name: string;
  age: number;
};

// 存在するpersonのIDをSetで管理（重複なし、効率的な検索）
const personIdsAtom = atom<Set<string>>(new Set<string>());

// atomFamily - 各personを個別に管理
const personAtomFamily = atomFamily((_id: string) => atom<Person | null>(null));

// Helper atoms for managing persons
const addPersonAtom = atom(null, (get, set) => {
  const currentIds = get(personIdsAtom);
  // UUIDライクなIDを生成（実際のプロジェクトではcrypto.randomUUID()など）
  const newId = `person-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newPerson: Person = {
    id: newId,
    name: `Person ${currentIds.size + 1}`,
    age: Math.floor(Math.random() * 100),
  };

  // Add new person
  set(personAtomFamily(newId), newPerson);
  // Update IDs set
  set(personIdsAtom, new Set([...currentIds, newId]));
});

const updateLastPersonAtom = atom(null, (get, set) => {
  const currentIds = get(personIdsAtom);
  const lastId = Array.from(currentIds).pop(); // Setの最後の要素
  if (lastId) {
    const currentPerson = get(personAtomFamily(lastId));
    if (currentPerson) {
      set(personAtomFamily(lastId), {
        ...currentPerson,
        age: currentPerson.age + 1,
      });
    }
  }
});

const deleteLastPersonAtom = atom(null, (get, set) => {
  const currentIds = get(personIdsAtom);
  const lastId = Array.from(currentIds).pop(); // Setの最後の要素
  if (lastId) {
    // Remove person
    set(personAtomFamily(lastId), null);
    // Update IDs set
    const newIds = new Set(currentIds);
    newIds.delete(lastId);
    set(personIdsAtom, newIds);
  }
});

function RouteComponent() {
  const [personIds] = useAtom(personIdsAtom);
  const [, addPerson] = useAtom(addPersonAtom);
  const [, updateLastPerson] = useAtom(updateLastPersonAtom);
  const [, deleteLastPerson] = useAtom(deleteLastPersonAtom);

  console.log("rendering SelectRoot");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          type="button"
          className="w-24 cursor-pointer bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => addPerson()}
        >
          add
        </button>
        <button
          type="button"
          className="w-24 cursor-pointer bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => updateLastPerson()}
        >
          update
        </button>

        <button
          type="button"
          className="w-24 cursor-pointer bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => deleteLastPerson()}
        >
          delete
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        {Array.from(personIds).map((personId) => (
          <PersonView key={personId} id={personId} />
        ))}
      </div>
    </div>
  );
}

type PersonViewProps = { id: string };
const PersonView = memo((props: PersonViewProps) => {
  const personAtom = useMemo(() => personAtomFamily(props.id), [props.id]);
  const [person] = useAtom(personAtom);

  console.log("rendering PersonView", props);

  return (
    <div className="border p-2">
      {person ? `${person.name}: ${person.age}歳` : "Person not found"}
    </div>
  );
});
