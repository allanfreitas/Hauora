import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../shared/model/cliente.model';
import { ConsultaService } from '../consulta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaAnamneseViewComponent } from './consulta-anamnese-view/consulta-anamnese-view.component';

@Component({
    selector: 'ngx-consulta-antropometria',
    templateUrl: './consulta-antropometria.component.html',
    styleUrls: ['./consulta-antropometria.component.scss'],
  })
  export class ConsultaAntropometriaComponent implements OnInit {
    pacienteSelecionado: any;
    selecionouPaciente: Boolean;
    @Input() cliente: Cliente;
    results: string[];
    listaDeClientesBusca: Cliente[];

    constructor(private consultaService: ConsultaService, private modalService: NgbModal) { }

    ngOnInit() {
        this.selecionouPaciente = false;
    }

    buscarPacientes(nomePaciente) {
      this.consultaService.getClientes(nomePaciente)
              .subscribe(
                  (listaDeClientesBusca: Cliente[]) => {
                      this.listaDeClientesBusca = listaDeClientesBusca;
                  },
              );
    }

    usuarioSelecionado(id) {
        this.selecionouPaciente = false;
        this.consultaService.getCliente(id)
              .subscribe(
                  (results: Cliente) => {
                      this.cliente = results;
                      this.selecionouPaciente = true;
                  },
              );
    }

    cancelaAnamnese() {
        if (confirm('Fazendo isso você perdera todos os dados da consulta')) {
            this.selecionouPaciente = false;
        } else {
        }
    }

    showModelAnamnese() {
        // tslint:disable-next-line:max-line-length
        const activeModal = this.modalService.open(ConsultaAnamneseViewComponent, { size: 'lg', container: 'nb-layout' });

        activeModal.componentInstance.modalHeader = 'Large Modal';
    }

}