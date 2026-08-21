import {
	KUBECTL_KOMMANDOER,
	KubectlKommando,
} from "../../data/kubectlKommandoer.ts";

interface PoddyKommandoerProps {
	kommandoer: KubectlKommando[];
}

export const PoddyKommandoer = ({ kommandoer }: PoddyKommandoerProps) => {
	const beskrivelser = kommandoer.flatMap((id) => {
		const beskrivelse = KUBECTL_KOMMANDOER.get(id);
		return beskrivelse ? [{ id, ...beskrivelse }] : [];
	});

	return (
		<div className="poddy-innhold">
			<dl className="poddy-liste">
				{beskrivelser.map(({ id, kommando, forklaring }) => (
					<div className="poddy-begrep" key={id}>
						<dt>
							<code>{kommando}</code>
						</dt>
						<dd>{forklaring}</dd>
					</div>
				))}
			</dl>
		</div>
	);
};
