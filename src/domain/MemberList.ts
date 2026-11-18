import type { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    const ix = this.#items.findIndex((member) => _documentId === member.documentId);
    if(ix === -1){
      throw new Error("Ese miembro no existe.");
    }
    this.#items.find((member) => _documentId === member.documentId).monthlyFee = _fee;
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    let total = 0;
    for(const mem of this.#items){
      if(mem.discount > 0){
        total+= mem.monthlyFee - (mem.discount*mem.monthlyFee)/100;
      } else {
        total+= mem.monthlyFee;
      }
    }
    return total;
  }
}
